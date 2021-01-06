import { Component, OnInit } from '@angular/core';
import {IFormBuilder,IFormGroup} from '@rxweb/types'
import {FormBuilder,Validators,FormGroup,Form, FormArray} from '@angular/forms'
import {Options} from '../Models/options';
import { Paperset } from '../Models/paperset';
import { List } from '@rxweb/generics';
import { element } from 'protractor';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  formGroup: IFormGroup<Paperset>;
  formBuilder: IFormBuilder;

  paperlist:List<Paperset>=new List <Paperset>([
    {
      questionId:'',
      paperlanguage:'',
      question:'',
      answer:'',
      options:[
        {
            name:'1'
        },
        {
            name:'2'
        }
      ]

    }
  ])

  languages =[
    {
      id:1,
      name:"TOC"
    },
    {
      id:2,
      name:"MALP"
    },
    {
      id:3,
      name:"ECHM"
    },
    {
      id:4,
      name:"SE"
    }
  ]
  result: any=this.paperlist;
  findId: Paperset | Error;
  indexNumber: number;

  constructor(formBuilder: FormBuilder) {     
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group<Paperset>({
      questionId:[''],
      paperlanguage:[''],
      question:[''],
      answer:[''],
      options:this.formBuilder.array<Options>([
        this.formBuilder.group({
          name:['']
        })
      ])
    });
    
  }

  get GetOption(){
    return this.formGroup.controls.options as FormArray;

  }
  addOption(){
    const control=this.formGroup.controls.options as FormArray;
    control.push(this.formBuilder.group({
      name:['']
    }))

  }
  submit(){
    const optionList:any=[];
    this.formGroup.value?.options.forEach(element =>
      {
        optionList.push(element)
      })

      this.paperlist.add({
        questionId:String(this.formGroup.value?.questionId),
        paperlanguage:String(this.formGroup.value?.paperlanguage),
        question:String(this.formGroup.value?.question),
        answer:String(this.formGroup.value?.answer),
        options:optionList
      })
      this.result=this.paperlist;
      console.log(this.result);
      this.formGroup.reset();
  }
  edit(questionId:any,id:number){
    this.findId = this.paperlist.firstOrDefault(x => x?.questionId == questionId)
    this.formGroup.setValue({
      questionId:this.findId.questionId,
      paperlanguage:this.findId.paperlanguage,
      question:this.findId.question,
      answer:this.findId.answer,
      options:this.findId.options

    })
    this.indexNumber = id;
  }


  

}
