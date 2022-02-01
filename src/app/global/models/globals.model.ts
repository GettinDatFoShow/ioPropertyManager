export interface IoPmUser {
    id?: string;
    companyName: string;
    joinDate: Date;
    contactDetails?: ContactDetails[];
    location?: any;
    active: boolean;
    membership?: any;
    properties?: Property[];
    employees?: Employee[];
    extraInfo?: ExtraInfo[];
}

export interface ContactDetails {
    id?: string;
    description?: string
    phone?: number;
    email?: string;
    hours?: any;
}

export interface Property {
    id?: string;
    type?: string;
    added: Date;
    active: boolean;
    propertyName: string;
    description?: string;
    extraInfo?: ExtraInfo[];
    location?: any;
    schedule?: any;
    homes?: Home[];
    owners?: Owner[];
}

export interface Home {
    id?: string;
    homeName: string
    description?: string;
    isRented: boolean;
    renters?: Owner[];
    buildDate?: Date;
    roomCount?: number;

}

export interface Room {
    id?: string;
    type: string;
    description?: string;
    items?: Item[];
}

export interface Item {
    id?: string;
    added?: Date;
    description?: string;
    buildYear?: number;
    extraInfo?: ExtraInfo[];
    website?: string;
    lastServiced?: Date[]
    nextService?: Date;
    nfcId?: string;
    qrCode?: string;
}

export interface Person {
    name?: Name;
    dob?: Date;
    contactDetails?: ContactDetails[];
    extraInfo?: ExtraInfo[];
}

export interface Owner {
    id?: string;
    personalInfo: Person;
}

export interface Employee {
    id?: string;
    personalInfo: Person;
    hireDate?: Date;
    active?: boolean;
    schedule?: any;
}

export interface ExtraInfo {
    id?: string;
    infoDescrtion?: string;
    info?: string;
}

export interface Name {
    id?: string;
    first?: string;
    middle?: string;
    last?: string;
    suffix?: string;
    prefix?: string;
}

export interface Schedule {
    id?: string;
    info?: any;
}