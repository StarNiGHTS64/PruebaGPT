const Person = require('../models/Types/PersonType');

module.exports = {
    persons: async function() {
        const persons = await Person.find();
        return {
            persons: persons.map((person) => {
                return {
                    ...person._doc,
                    _id: person._id.toString()
                }
            })
        }
    },

    createPerson: async function({ personInput }) {
        console.log('s')
        const person = new Person({
            firstName: personInput.firstName,
            patternLastName: personInput.patternLastName,
            matternLastName: personInput.matternLastName,
            address: personInput.address,
            phoneNumber: personInput.phoneNumber
        })
        const createdPerson = await person.save();
        console.log(createdPerson);
        return{
            ...createdPerson._doc,
            id: createdPerson._id.toString(),
        }
    },

    updatePerson: async function({ id, personInput}) {
        const person = await Person.findById(id);
        console.log(person.firstName);
        console.log(personInput.firstName);
        if(!person) {
            throw new Error('No Person Found!')
        }
        person.firstName = personInput.firstName;
        person.patternLastName = personInput.patternLastName;
        person.matternLastName = personInput.matternLastName;
        person.address = personInput.address;
        person.phoneNumber = personInput.phoneNumber;

        const updatedPerson = await person.save();
        return {
            ...updatedPerson._doc,
            _id: updatedPerson._id.toString(),
        }
    },

    deletePerson: async function({id}) {
        const person = await Person.findById(id)
        if(!person) {
            throw new Error('No Person Found!')
        }
        await Person.findByIdAndDelete(id);
        return {
            ...person._doc,
            _id: person._id.toString(),
        }
    }
}