import { DataFeedParams } from "../../interfaces/data-feed.interface.ts";
import type {
  AasBasedByAAsResponse,
  aasBasedByAAsWithVarsResponse,
  AssetBySymbolResponse,
  AssetBySymbolsResponse,
  AssetMetadataResponse,
  AssetsMetadataResponse,
  BalancesResponse,
  DefinitionResponse,
  DefinitionsResponse,
  ErrorResponse,
  JointResponse,
  StateVarsResponse
} from "../../interfaces/client-responses.interface.ts";
import { NetworkClientService } from "../network-client/network-client.service.ts";

export default class ODappApiService {
  networkClientService: NetworkClientService;

  constructor(baseUrl: string, useRestClient = false) {
    this.networkClientService = new NetworkClientService(baseUrl, useRestClient);
  }

  getJoint(unit: string): Promise<JointResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getJoint',
      unit,
    }) as Promise<JointResponse | ErrorResponse>;
  }

  getJoints(units: string[]): Promise<JointResponse[] | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getJoints',
      units,
    }) as Promise<JointResponse[] | ErrorResponse>;
  }

  getDefinition(address: string): Promise<DefinitionResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getDefinition',
      address,
    }) as Promise<DefinitionResponse | ErrorResponse>;
  }

  getDefinitions(addresses: string[]): Promise<DefinitionsResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getDefinitions',
      addresses,
    }) as Promise<DefinitionsResponse | ErrorResponse>;
  }

  getAAsByBaseAAs(baseAAs: string[]): Promise<AasBasedByAAsResponse[] | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAAsByBaseAAs',
      baseAAs,
    }) as Promise<AasBasedByAAsResponse[] | ErrorResponse>;
  }

  getAAsByBaseAAsWithVars(baseAAs: string[]): Promise<aasBasedByAAsWithVarsResponse[] | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAAsByBaseAAsWithVars',
      baseAAs,
    }) as Promise<aasBasedByAAsWithVarsResponse[] | ErrorResponse>;
  }

  getBalances(addresses: string[]): Promise<BalancesResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getBalances',
      addresses,
    }) as Promise<BalancesResponse | ErrorResponse>;
  }

  getAAStateVars(aa: string): Promise<StateVarsResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAAStateVars',
      aa,
    }) as Promise<StateVarsResponse | ErrorResponse>;
  }

  getAAStateVar(aa: string, varName: string): Promise<number | string | boolean | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAAStateVar',
      aa,
      varName,
    }) as Promise<number | string | boolean | ErrorResponse>;
  }

  getDataFeed(oracles: string[], feedName: string, otherParams: DataFeedParams): Promise<string | number | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getDataFeed',
      params: {
        oracles,
        feed_name: feedName,
        ...otherParams,
      },
    }) as Promise<string | number | ErrorResponse>;
  }

  getAssetMetadata(asset: string): Promise<AssetMetadataResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAssetMetadata',
      asset,
    }) as Promise<AssetMetadataResponse | ErrorResponse>;
  }

  getAssetsMetadata(assets: string[]): Promise<AssetsMetadataResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAssetsMetadata',
      assets,
    }) as Promise<AssetsMetadataResponse | ErrorResponse>;
  }

  getAssetBySymbol(symbol: string): Promise<AssetBySymbolResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAssetBySymbol',
      symbol,
    }) as Promise<AssetBySymbolResponse | ErrorResponse>;
  }

  getAssetBySymbols(symbols: string[]): Promise<AssetBySymbolsResponse | ErrorResponse> {
    return this.networkClientService.request({
      type: 'getAssetBySymbols',
      symbols,
    }) as Promise<AssetBySymbolsResponse | ErrorResponse>;
  }
}
