import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

@Injectable()
export class EnvironmentService {

  constructor(private apollo: Apollo) {

  }

  fetchEnvironments() {
    return this.apollo
      .watchQuery({
        query: gql`
          query EnvironmentsQuery {
             findAllEnvironments {
              id
              name
            }
          }`
      })
      .valueChanges
      .map((response: any) => response.data.findAllEnvironments);
  }

}
