import {Options} from './options'

export interface Paperset{

    questionId:string;
    paperlanguage:string;
    question:string;
    answer:string;
    options:Options[];

}