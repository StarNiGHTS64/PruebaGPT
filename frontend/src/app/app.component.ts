import { Component, OnInit } from '@angular/core';
import { Apollo, gql} from 'apollo-angular';

import { Observable, map } from 'rxjs';

import { PersonInput } from './models/person.model';
import { CREATE_PERSON, DELETE_PERSON, UPDATE_PERSON } from './graphql/mutations';
import { GET_PERSONS } from './graphql/queries';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  persons: Observable<any> | undefined;

  constructor(private apollo: Apollo) {

  }

  ngOnInit(): void {
    this.persons = this.apollo.watchQuery({
      query: GET_PERSONS,
    }).valueChanges.pipe(
      map((result: any) => {
        console.log(result.data.persons.persons);
        return result.data.persons.persons;
      })
    )
  }

  createPerson(firstName: string, patternLastName: string, matternLastName: string, address: string, phoneNumber: string){
    //console.log(firstName, patternLastName, matternLastName, address, phoneNumber);
    this.apollo.mutate({
      mutation: CREATE_PERSON,
      refetchQueries: [{query: GET_PERSONS}],
      variables: {
        firstName: firstName, 
        patternLastName: patternLastName,
        matternLastName: matternLastName,
        address: address,
        phoneNumber: phoneNumber
      },
    }).subscribe(() => {
      console.log("Created");
    });
  }

  deletePerson(id: string) {
    console.log(id);
    this.apollo.mutate({
      mutation: DELETE_PERSON,
      refetchQueries: [{query: GET_PERSONS}],
      variables: {
        id:id
      },
    }).subscribe(() => {
      console.log("Deleted");
    });
  }

  updatePerson(id: string, firstName: string, patternLastName: string, matternLastName: string, address: string, phoneNumber: string){
    console.log(id, firstName, patternLastName, matternLastName, address, phoneNumber);
    this.apollo.mutate({
      mutation: UPDATE_PERSON,
      refetchQueries: [{query: GET_PERSONS}],
      variables: {
        id: id,
        firstName: firstName, 
        patternLastName: patternLastName,
        matternLastName: matternLastName,
        address: address,
        phoneNumber: phoneNumber
      },
    }).subscribe(() => {
      console.log("Updated");
    });
  }

}
