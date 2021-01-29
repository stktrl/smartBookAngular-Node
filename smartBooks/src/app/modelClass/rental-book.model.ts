import { Member } from "./member.model"

export class RentalBook {
    _id!:String
    bookName!: string
    bookCategory!:string
    bookStock!:String
    bookAuthor!:String
    bookBarcode!:String
    bookPublisherHouse!:String
   // member!: Member
    member!: {
        memberName: String
        memberEmail: String
        memberPhone: String
        memberTcNo: String
    }
    date!: String
}

