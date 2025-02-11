import { Component, OnInit } from '@angular/core';
import { Apollo, gql} from 'apollo-angular';

import { Observable, map } from 'rxjs';

const GET_PERSONS = gql`
  {
  persons{
  	persons{
      _id
      firstName
      patternLastName
      matternLastName
      address
      phoneNumber
    }
  }
}
`;

const CREATE_PERSON = gql`
  mutation createPerson(
    $firstName: String!,
    $patternLastName: String!,
    $matternLastName: String!,
    $address: String!,
    $phoneNumber: String!
  ){
    createPerson(personInput: { 
    firstName: $firstName, 
    patternLastName: $patternLastName,
    matternLastName: $matternLastName,
    address: $address,
    phoneNumber: $phoneNumber
    }) {
      _id
      firstName
      patternLastName
      matternLastName
      address
      phoneNumber
    }
  }
`

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
      }
    }).subscribe(() => {
      console.log("Created");
    });
  }
}
