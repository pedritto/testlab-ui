import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import { setContext } from 'apollo-link-context';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {

  constructor(apollo: Apollo, httpLink: HttpLink) {

    const uri = 'http://localhost:8080/graphql';
    const http = httpLink.create({ uri });

    const authLink = setContext((_, { headers }) => {
      const token = '5959649b3b067a55a3c1ffad';
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    apollo.create({
      link: authLink.concat(http),
      cache: new InMemoryCache()
    });
  }
}
