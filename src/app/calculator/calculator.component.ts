import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
    mealDetails;
    subtotal: number = 0;
    tip: number = 0;
    total: number = 0;


    constructor() {


    }

    ngOnInit() {

    }

    calculateCharge(formValue) {
        console.log(formValue);
        this.subtotal = formValue.price * ((formValue.taxRate + 100) / 100);
        this.tip = this.subtotal * formValue.tipRate / 100;
        this.total = this.subtotal + this.tip;
    }

}
