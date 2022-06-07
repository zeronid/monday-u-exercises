import { getPokemon, isListOfPokemons, isPokemon, readFile, writeToFile, pokemonExistsInTodoList, overwriteFile } from './helper.js';

export async function get() {
    const data = await readFile();
    return data;
}

export async function add(item) {
    let response

    if (isListOfPokemons(item)) {
        const listOfPokemons = item.split(',');
        response = "Pokemons added successfully :)"
        for (let i = 0; i < listOfPokemons.length; i++) {
            let pokemon = await getPokemon(listOfPokemons[i])
            if (pokemon === 0) {
                console.log(`Wrong Pokemon number --> ${listOfPokemons[i]}`)
                continue
            }
            pokemon = pokemon.data.name
            let doesPokemonExists = await pokemonExistsInTodoList(pokemon)
            if (!doesPokemonExists) {
                const res = await writeToFile(`catch ${pokemon}`)
                if (res !== "Item has been added :)") {
                    console.log(res)
                    response = "Items have not been added :("
                }
            } else {
                response = "Some pokemons already exist"
            }
        }
    }
    else if (isPokemon(item)) {
        let pokemon = await getPokemon(item)
        if (pokemon === 0) {
            console.log("Wrong Pokemon number")
            return
        }
        pokemon = pokemon.data.name
        let doesPokemonExists = await pokemonExistsInTodoList(pokemon)
        if (!doesPokemonExists) {
            response = await writeToFile(`catch ${pokemon}`)
        } else {
            response = "Pokemon already exists :("
        }

    } else {
        response = await writeToFile(item)
    }
    console.log(response)
}

export async function deleteItem(index) {
    let data = await readFile()
    if (index < 0 || data.length === 0 || index > data.length) {
        console.log("Index is out of bounds")
        return
    }
    data.splice(index, 1)
    await overwriteFile(data)
}