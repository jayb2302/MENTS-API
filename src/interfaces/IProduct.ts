import { IUser } from './Iuser';

export interface IProduct extends Document {
    name: string;
    description: string;
    imageURL: string;
    price: number;
    stock: number;
    isOnDiscount: boolean;
    discountPct: number;
    isHidden: boolean;
    _createdBy: IUser['id'];
}