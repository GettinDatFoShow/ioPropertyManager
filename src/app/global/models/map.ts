export interface IGeometry {
    type: string;
    coordinates: number[]
}

export interface IGeoJson {
    type: string;
    geometry: IGeometry,
    properties?: any,
    $key?: String
}

export class GeoJson implements IGeoJson {
    type = 'Feature';
    geometry: IGeometry;

    constructor(coordinates, public properties?) {
        this.geometry = {
            type: 'Point', 
            coordinates: coordinates
        }
    }
}

export class FeatureCollection {
    type = 'FeatureCollection';
    constructor(public features: Array<GeoJson>) {}
}

export interface MapboxOutput {
    attribution: string;
    features: Feature[];
    query: [];
    type: string;
}

export interface Feature {
    id: string;
    address: string;
    place_name: string;
    center: [];
    context: [];
    geometry: IGeometry;
    place_typ: [];
    properties: any;
    relevance: 1;
    text: string;
    type: string;   
}

export interface PlaceContext {
    id: string;
    text: string;
    short_code?: string;
    wikidata?: string;
}