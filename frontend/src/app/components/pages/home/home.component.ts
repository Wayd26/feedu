import { ActivatedRoute } from '@angular/router';
import { FoodService } from './../../../services/food.service';
import { Food } from './../../../shared/models/Food';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];

  constructor(private foodService: FoodService, activatedRoute:ActivatedRoute) {
    let foodsObservable: Observable<Food[]>
    activatedRoute.params.subscribe((params) => {
      if(params["searchTerm"]) {
        console.log("searchTerm found")
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params["searchTerm"])
      }
      else if(params["tagName"]) {
          console.log("tagName found")
          foodsObservable = this.foodService.getAllFoodsByTag(params["tagName"])
          console.log(foodsObservable)
        }
      else
      {
        foodsObservable = foodService.getAll()
      }

        foodsObservable.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
    })

    foodsObservable = foodService.getAll();
  }

  ngOnInit(): void {

  }
}
