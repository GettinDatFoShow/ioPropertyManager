
export interface User {
    uid?: string;
    signInEmail?: string;
    personalInfo?: Person;
    joinDate?: Date;
    location?: any;
    active?: boolean;
    membership?: any;
}

export interface Owner extends User {
    companyId?: string;
    extraInfo?: ExtraInfo[];
}

export interface Company {
    cid?: string;
    contactDetails?: ContactDetails;
    location?: any;
    addedDate?: Date;
    properties?: Property[];
    employees?: User[];
}

export interface Employee extends User {
    hireDate?: Date;
    schedule?: any;
}
export interface ContactDetails {
    description?: string
    phone?: number;
    email?: string;
    hours?: any;
    website?: string;
}

export interface Property {
    id?: string;
    type?: string;
    added?: Date;
    active?: boolean;
    propertyName?: string;
    description?: string;
    extraInfo?: ExtraInfo[];
    location?: any;
    schedule?: any;
    homes?: Home[];
    owners?: User[];
}

export interface Home {
    id?: string;
    homeName?: string
    description?: string;
    isRented?: boolean;
    renters?: User[];
    buildDate?: Date;
    roomCount?: number;
}

export interface Room {
    id?: string;
    type?: string;
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