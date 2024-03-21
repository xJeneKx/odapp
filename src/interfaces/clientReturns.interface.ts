import { Joint } from "./joint.interface.ts";

export interface ErrorReturn {
    error: string
}

export type JointReturn = Joint

export type DefinitionReturn = Array<any>

export interface DefinitionsReturn {
    [address: string]: DefinitionReturn
}


export type DefinitionAAReturn = ['autonomous agent', any]


export interface AasBasedByAAsReturn {
    address: string
    definition: DefinitionAAReturn
    unit: string
    creation_date: string
}

export interface StateVarsReturn {
    [key: string]: any
}

export interface aasBasedByAAsWithVarsReturn {
    address: string
    definition: DefinitionAAReturn
    unit: string
    creation_date: string
    stateVars: StateVarsReturn
}

export interface BalancesReturn {
    [address: string]: {
        [asset: 'base' | string]: {
            stable: number
            pending: number
            stable_outputs_count: number
            pending_outputs_count: number
            total: number
        }
    }
}

export interface AssetMetadataReturn {
    metadata_unit: string
    registry_address: string
    suffix: null | string
    asset: string
    name: string
    decimals: number
}

export interface AssetsMetadataReturn {
    [asset: string]: AssetMetadataReturn
}

export type AssetBySymbolReturn = string;

export interface AssetBySymbolsReturn {
    [symbol: string]: AssetBySymbolReturn
}
