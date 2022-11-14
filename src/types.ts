interface IData {
    message: string;
    iss_position: {
        latitude: string;
        longitude: string;
    };
    timestamp?: number;
    people: {
        name: string;
        craft: string;
    }[];
    number?: number;
}

export type { IData }