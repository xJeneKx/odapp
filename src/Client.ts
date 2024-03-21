import APIBase from './APIBase.js';
import {DataFeedParams} from "./interfaces/dataFeed.interface.ts";
import type {
	AasBasedByAAsReturn,
	aasBasedByAAsWithVarsReturn,
	AssetBySymbolReturn,
	AssetBySymbolsReturn,
	AssetMetadataReturn,
	AssetsMetadataReturn,
	BalancesReturn,
	DefinitionReturn,
	DefinitionsReturn, ErrorReturn,
	JointReturn,
	StateVarsReturn
} from "./interfaces/clientReturns.interface.ts"; 

export default class Client extends APIBase {
	
	constructor(testnet = false, useRestClient = false) {
		super(testnet, useRestClient);
	}
	
	getJoint(unit: string): Promise<JointReturn | ErrorReturn> {
		return this.asyncRequest({
			type: 'getJoint',
			unit,
		}) as Promise<JointReturn | ErrorReturn>;
	}
	
	getJoints(units: string[]): Promise<JointReturn[] | ErrorReturn> {
		return this.asyncRequest({
			type: 'getJoints',
			units,
		}) as Promise<JointReturn[] | ErrorReturn>;
	}
	
	getDefinition(address: string): Promise<DefinitionReturn | ErrorReturn> {
		return this.asyncRequest({
			type: 'getDefinition',
			address,
		}) as Promise<DefinitionReturn | ErrorReturn>;
	}
	
	getDefinitions(addresses: string[]): Promise<DefinitionsReturn | ErrorReturn> {
		return this.asyncRequest({
			type: 'getDefinitions',
			addresses,
		}) as Promise<DefinitionsReturn | ErrorReturn>;
	}
	
	getAAsByBaseAAs(baseAAs: string[]): Promise<AasBasedByAAsReturn[] | ErrorReturn> {
		return this.asyncRequest({
			type: 'getAAsByBaseAAs',
			baseAAs,
		}) as Promise<AasBasedByAAsReturn[] | ErrorReturn>;
	}
	
	getAAsByBaseAAsWithVars(baseAAs: string[]): Promise<aasBasedByAAsWithVarsReturn[] | ErrorReturn> {
		return this.asyncRequest({
			type: 'getAAsByBaseAAsWithVars',
			baseAAs,
		}) as Promise<aasBasedByAAsWithVarsReturn[] | ErrorReturn>;
	}
	
	getBalances(addresses: string[]): Promise<BalancesReturn | ErrorReturn> {
		return this.asyncRequest({
			type: 'getBalances',
			addresses,
		}) as Promise<BalancesReturn | ErrorReturn>;
	}
	
	getAAStateVars(aa: string): Promise<StateVarsReturn | ErrorReturn> {
		return this.asyncRequest({
			type: 'getAAStateVars',
			aa,
		}) as Promise<StateVarsReturn | ErrorReturn>;
	}
	
	getAAStateVar(aa: string, varName: string): Promise<number | string | boolean | ErrorReturn> {
		return this.asyncRequest({
			type: 'getAAStateVar',
			aa,
			varName,
		}) as Promise<number | string | boolean | ErrorReturn>;
	}
	
	getDataFeed(oracles: string[], feedName: string, otherParams: DataFeedParams): Promise<string | number | ErrorReturn> {
		return this.asyncRequest({
			type: 'getDataFeed',
			params: {
				oracles,
				feed_name: feedName,
				...otherParams,
			},
		}) as Promise<string | number | ErrorReturn>;
	}
	
	getAssetMetadata(asset: string): Promise<AssetMetadataReturn | ErrorReturn> {
		return this.asyncRequest({
			type: 'getAssetMetadata',
			asset,
		}) as Promise<AssetMetadataReturn | ErrorReturn>;
	}
	
	getAssetsMetadata(assets: string[]): Promise<AssetsMetadataReturn | ErrorReturn> {
		return this.asyncRequest({
			type: 'getAssetsMetadata',
			assets,
		}) as Promise<AssetsMetadataReturn | ErrorReturn>;
	}
	
	getAssetBySymbol(symbol: string): Promise<AssetBySymbolReturn | ErrorReturn> {
		return this.asyncRequest({
			type: 'getAssetBySymbol',
			symbol,
		}) as Promise<AssetBySymbolReturn | ErrorReturn>;
	}
	
	getAssetBySymbols(symbols: string[]): Promise<AssetBySymbolsReturn | ErrorReturn> {
		return this.asyncRequest({
			type: 'getAssetBySymbols',
			symbols,
		}) as Promise<AssetBySymbolsReturn | ErrorReturn>;
	}
	
	asyncRequest(data: any) {
		return super.asyncRequest(data);
	}
}

