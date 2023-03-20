import { FoodService } from './../../../services/food.service';
import { Tag } from './../../../shared/models/Tag';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tags?: Tag[]
  constructor (foodService: FoodService){
    foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
  }

  ngOnInit(): void {

  }
}
