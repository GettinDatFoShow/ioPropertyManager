import { Feature } from "./map";

export interface User {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    signInEmail?: string;
    personalInfo?: Person;
    joinDate?: Date;
    location?: Feature;
    active?: boolean;
    isOwner?: boolean;
    membership?: any;
    companyId?: string;
    displayImage?: string;
    extraInfo?: ExtraInfo[];
}

export interface Location {
    street: string;
    city: string;
    state: string;
    zip: string;
    geo?: string;
}

export interface Company {
    cid?: string;
    name?: string;
    contactDetails?: ContactDetails;
    location?: Feature;
    addedDate?: Date;
    properties?: Property[];
    employees?: User[];
}

export interface Employee extends User {
    hireDate?: Date;
    schedule?: any;
}
export interface ContactDetails {
    contactType?: string
    phone?: number;
    email?: string;
    hours?: any;
    website?: string;
}

export interface Property {
    pid?: string;
    type?: string;
    added?: Date;
    active?: boolean;
    propertyName?: string;
    description?: string;
    extraInfo?: ExtraInfo[];
    location?: Feature;
    schedule?: any;
    homes?: Home[];
    owners?: Person[];
}

export interface Home {
    hid?: string;
    homeName?: string
    description?: string;
    isRented?: boolean;
    renters?: User[];
    buildDate?: Date;
    roomCount?: number;
}

export interface Room {
    rid?: string;
    type?: string;
    description?: string;
    items?: Item[];
}

export interface Item {
    iid?: string;
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
    eiid?: string;
    infoDescrtion?: string;
    info?: string;
}

export interface Name {
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