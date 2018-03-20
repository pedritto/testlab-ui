import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  constructor(private apollo: Apollo) {

  }

  fetchCategories() {
    return this.apollo
      .watchQuery({
        query: gql`
          query CategoryValuesQuery {
             findAllCategories {
              id
              name
            }
          }`
      })
      .valueChanges
      .map((response: any) => response.data.findAllCategories);
  }

}
