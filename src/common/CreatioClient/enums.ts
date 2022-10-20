
/**
 * Creatio DataValueType
 * @external Terrasoft.Nui.ServiceModel.DataContract.Enums
 * - {@link http://tsbuild-app-03:99/#Terrasoft.Nui.ServiceModel/DataContract/Enums.cs,6cc39c70f900c37b,references Terrasoft.Nui.ServiceModel.DataContract.Enums}
 */
 export enum DataValueType {
	Guid = 0,
	Text = 1,
	Integer = 4,
	Float = 5,
	Money = 6,
	DateTime = 7,
	Date = 8,
	Time = 9,
	Lookup = 10,
	Enum = 11,
	Boolean = 12,
	Blob = 13,
	Image = 14,
	Object = 15,
	ImageLookup = 16,
	ValueList = 17,
	Color = 18,
	LocalizableStringDataValueType = 19,
	EntityDataValueType = 20,
	EntityCollectionDataValueType = 21,
	EntityColumnMappingCollectionDataValueType = 22,
	HashText = 23,
	SecureText = 24,
	File = 25,
	Mapping = 26,
	ShortText = 27,
	MediumText = 28,
	MaxSizeText = 29,
	LongText = 30,
	Float1 = 31,
	Float2 = 32,
	Float3 = 33,
	Float4 = 34,
	LocalizableParameterValuesListDataValueType = 35,
	MetaDataTextDataValueType = 36,
	ObjectList = 38,
	CompositeObjectList = 39,
	Float8 = 40,
	FileLocatorDataValueType = 41
}

/**
 * Defines parameter direction
 * - {@link http://tsbuild-app-03:99/#Terrasoft.Common/Enums.cs,84d0e29e95fea537 ParameterDirection}
 */
export enum ParameterDirection{
	Input = 0,
	Output = 1,
	Bidirectional = 2
}

/**
 * DataValueTypeId
 * {@link http://tsbuild-app-03:99/#Terrasoft.Core/DataValueType.cs,98 | DataValueTypeId}
 */
export const  ProcessDataValueType = {
	'23018567-a13c-4320-8687-fd6f9e3699bd' : DataValueType.Guid,
	'8b3f29bb-ea14-4ce5-a5c5-293a929b6ba2' : DataValueType.Text,
	'6b6b74e2-820d-490e-a017-2b73d4ccf2b0' : DataValueType.Integer,
	'57ee4c31-5ec4-45fa-b95d-3a2868aa89a8' : DataValueType.Float,
	'969093e2-2b4e-463b-883a-3d3b8c61f0cd' : DataValueType.Money,
	'd21e9ef4-c064-4012-b286-fa1a8171da44' : DataValueType.DateTime,
	'603d4960-a1a2-45e9-b232-206a54421b01' : DataValueType.Date,
	'04cc757b-8f06-482c-8a1a-0c0e171d2410' : DataValueType.Time,
	'b295071f-7ea9-4e62-8d1a-919bf3732ff2' : DataValueType.Lookup,
	'90b65bf8-0ffc-4141-8779-2420877af907' : DataValueType.Boolean,
	'b7342b7a-5dde-40de-aa7c-24d2a57b3202' : DataValueType.Blob,
	'fa6e6e49-b996-475e-a77e-73904e4c5a88' : DataValueType.Image,
	'84ed6865-9692-4c98-aaed-4d15b96a95c2' : DataValueType.Object,
	'b039feb0-ee7c-4884-8aa6-d6d45d84316f' : DataValueType.ImageLookup,
	'190eb54a-5b4c-4a2a-8dda-8d0558cda835' : DataValueType.ValueList,
	'dafb71f9-ee9f-4e0b-a4d7-37aa15987155' : DataValueType.Color,
	'95c6e6c4-2cc8-46be-a1cb-96f942655f86' : DataValueType.LocalizableStringDataValueType,
	'ebd85d37-0abf-4bbf-bb32-97dc3dffcc8c' : DataValueType.EntityDataValueType,
	'51fb23ba-3eb2-11e2-b7d5-b0c76188709b' : DataValueType.EntityCollectionDataValueType,
	'b53eaa2a-4bb7-4a6b-9f4f-58ccab293e31' : DataValueType.EntityColumnMappingCollectionDataValueType,
	'ecbcce18-2a17-4ead-829a-9d02fa9578a4' : DataValueType.HashText,
	'3509b9dd-2c90-4540-b82e-8f6ae85d8248' : DataValueType.SecureText,
	'ba40cfc5-f554-4c26-8f57-1bb29cf43c4e' : DataValueType.File,
	'325a73b8-0f47-44a0-8412-7606f78003ac' : DataValueType.ShortText,
	'ddb3a1ee-07e8-4d62-b7a9-d0e618b00fbd' : DataValueType.MediumText,
	'c0f04627-4620-4bc0-84e5-9419dc8516b1' : DataValueType.MaxSizeText,
	'5ca35f10-a101-4c67-a96a-383da6afacfc' : DataValueType.LongText,
	'07ba84ce-0bf7-44b4-9f2c-7b15032eb98c' : DataValueType.Float1,
	'5cc8060d-6d10-4773-89fc-8c12d6f659a6' : DataValueType.Float2,
	'3f62414e-6c25-4182-bcef-a73c9e396f31' : DataValueType.Float3,
	'ff22e049-4d16-46ee-a529-92d8808932dc' : DataValueType.Float4,
	'cffc4762-c5c7-44bc-8cc6-cb55aba6e06b' : DataValueType.LocalizableParameterValuesListDataValueType,
	'394e160f-c8e0-46fa-9c0d-75d97e9e9169' : DataValueType.MetaDataTextDataValueType,
	'4b51a8b5-1ee9-4437-9d58-f35e083cbcdf' : DataValueType.ObjectList,
	'651ec16f-d140-46db-b9e2-825c985a8ac2' : DataValueType.CompositeObjectList,
	'a4aaf398-3531-4a0d-9d75-a587f5b5b59e' : DataValueType.Float8,
	'a33c9252-d401-453e-949d-169157067ed9' : DataValueType.FileLocatorDataValueType,
}




export enum ColumnUsage{
	/**
	 * Common usage - default
	 */
	General = 0,
	
	/**
	 * For extended mode usage
	 */
	Advanced = 1,
	
	/**
	 * Not used
	 */
	None = 2
}


export enum LogLevel{
	ALL,
	Debug,
	Error,
	Fatal,
	Info,
	Trace,
	Warn
}