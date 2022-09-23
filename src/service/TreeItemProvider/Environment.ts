import * as vscode from 'vscode';
import path = require('path');
import { HealthStatus } from '../../common/Enums';
import { PackageList } from './PackageList';
import { ProcessList } from './ProcessList';
import { EntityList } from './EntityList';
import { CreatioTreeItem } from "./CreatioTreeItem";
import { ItemType } from "./ItemType";
import { IHealthCheckArgs } from '../../commands/HealthCheckCommand';
import { CreatioClient } from '../../common/CreatioClient/CreatioClient';
import { ClioExecutor } from '../../Common/clioExecutor';
import { IRestoreConfigurationArgs } from '../../commands/RestoreConfiguration';
import { Clio } from '../../commands/Clio';
import { IFlushDbArgs } from '../../commands/FlushDbCommand';
import { ISqlArgs } from '../../commands/SqlCommand';

export class Environment extends CreatioTreeItem {

	private healthStatus: HealthStatus = HealthStatus.unknown;
	public readonly connectionSettings : IConnectionSettings;
	private creatioClient: CreatioClient;
	private readonly clioExecutor: ClioExecutor = new ClioExecutor();
	private readonly clio: Clio = new Clio();
	public contextValue = 'CreatioInstance';
	constructor( label: string, connectionSettings :IConnectionSettings)
	{
		super(label, "", ItemType.creatioInstance, vscode.TreeItemCollapsibleState.Collapsed);
		this.connectionSettings = connectionSettings;
		this.items.push(new PackageList());
		this.items.push(new ProcessList());
		this.items.push(new EntityList());
		this.creatioClient = new CreatioClient(connectionSettings.uri, connectionSettings.login, connectionSettings.password, connectionSettings.isNetCore);
		this.setHealthStatus(HealthStatus.unknown);
		this.checkHealth();
	}

	//#region Public methods
	
	/**
	* Checks creatio health
	*/
	public async checkHealth(): Promise<void> {

		const args: IHealthCheckArgs = {
			webApp: true,
			webHost: true,
			environmentName: this.label
		};

		if(this.clio.healthCheck.canExecute(args).success){
			const result = await this.clio.healthCheck.executeAsync(args);
			if (result.success && result.isWebAppHeathy && result.isWebHostHealthy) {
				this.setHealthStatus(HealthStatus.healthy);
			} else {
				this.setHealthStatus(HealthStatus.unHealthy);
			}
		}
	}

	/**
	* Restore configuration
	*/
	public async restoreConfiguration(): Promise<void> {
		const args: IRestoreConfigurationArgs = {
			environmentName: this.label
		};
		
		if (this.clio.restoreConfiguration.canExecute(args).success) {
			const result = await this.clio.restoreConfiguration.executeAsync(args);
			if (result.success) {
				vscode.window.showInformationMessage(`Restore configuration : ${result.message}`);
			} else if (!result.success) {
				vscode.window.showErrorMessage(`Restore configuration : ${result.message}`);
			}
		}
	}

	/**
	 * Flushes redis
		*/
	public async unregisterWebApp(): Promise<void> {
		const args: IFlushDbArgs = {
			environmentName: this.label
		};
		const isArgValid = this.clio.unregWebApp.canExecute(args);
		if (isArgValid) {
			const result = await this.clio.unregWebApp.executeAsync(args);
			if (result.success) {
				this._onDeleted?.fire(this);
				vscode.window.showInformationMessage(`Unreg web app : ${result.message}`);
			} else if (!result.success) {
				vscode.window.showErrorMessage(`Unreg web app : ${result.message}`);
			}
		}
	}

	/**
	 * Flushes redis
	 */
	public async flushDb(): Promise<void> {
		const args: IFlushDbArgs = {
			environmentName: this.label
		};

		if (this.clio.flushDb.canExecute(args).success) {
			const result = await this.clio.flushDb.executeAsync(args);
			if (result.success) {
				vscode.window.showInformationMessage(`Flushdb : ${result.message}`);
			} else if (!result.success) {
				vscode.window.showErrorMessage(`Flushdb : ${result.message}`);
			}
		}
	}

	/**
	 * Restarts web app
	 */
	 public async restartWebApp(): Promise<void> {
		this.clioExecutor.executeCommandByTerminal(`restart -e "${this.label}"`);
	}

	public async openInBrowser(): Promise<void> {
		this.clioExecutor.executeCommandByTerminal(`open -e "${this.label}"`);
	}

	public async installGate(): Promise<void> {
		this.clioExecutor.executeCommandByTerminal(`installgate "${this.label}"`);
	}

	public async installPackage(filePath: String): Promise<void> {
		this.clioExecutor.executeCommandByTerminal(`push-pkg "${filePath}" -e "${this.label}"`);
	}


	public async executeSql(sqlText: String): Promise<String> {
		
		// const rresult = await this.creatioClient.ExecuteSqlScript(sqlText as string);
		// const json = JSON.parse(JSON.parse(rresult.body));
		// return JSON.stringify(json);

		const args: ISqlArgs = {
			sqlText: sqlText,
			environmentName: this.label
		};
		const validationResult = this.clio.sql.canExecute(args);

		if (!validationResult.success) {
			throw new Error(validationResult.message.toString());
		}

		const result = await this.clio.sql.executeAsync(args);
		if (result.success) {
			return result.message;
		} else {
			throw new Error(result.message.toString());
		}
	}
	//#region Methods : Private
	private setHealthStatus(status: HealthStatus): void {
		switch (status) {
			case HealthStatus.unknown: {
				this.setUnknownHealthIcon();
				break;
			}
			case HealthStatus.healthy: {
				this.setHealthyIcon();
				break;
			}
			case HealthStatus.unHealthy: {
				this.setUnhealthyIcon();
				break;
			}
		}
		this.healthStatus = status;
	}
	private setUnknownHealthIcon(): void {
		this.iconPath = {
			light: path.join(__filename, '..', '..', '..','..', 'resources', 'icon', 'creatio-circle-white.svg'),
			dark: path.join(__filename, '..', '..', '..','..', 'resources', 'icon', 'creatio-circle-white.svg')
		};
		this._onDidStatusUpdate?.fire(this);
	}
	private setHealthyIcon(): void {
		this.iconPath = {
			light: path.join(__filename, '..', '..', '..','..', 'resources', 'icon', 'circle-green-bottom.svg'),
			dark: path.join(__filename, '..', '..', '..','..', 'resources', 'icon', 'circle-green-bottom.svg')
		};
		this._onDidStatusUpdate?.fire(this);
	}
	private setUnhealthyIcon(): void {
		this.iconPath = {
			light: path.join(__filename, '..', '..', '..','..', 'resources', 'icon', 'circle-red-bottom.svg'),
			dark: path.join(__filename, '..', '..', '..','..', 'resources', 'icon', 'circle-red-bottom.svg')
		};
		this._onDidStatusUpdate?.fire(this);
	}

	
	//#endregion
}


/**
 * Describes clio app in appsettings.json
 */
export interface IConnectionSettings {
	uri: URL,
	login: string
	password: string,
	maintainer: string,
	isNetCore: boolean,
	isSafe: boolean,
	isDeveloperMode: boolean
}