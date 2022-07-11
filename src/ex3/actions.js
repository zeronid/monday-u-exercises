import { getPokemon, isListOfPokemons, isPokemon, readFile, writeToFile, pokemonExistsInTodoList, overwriteFile, pokemonToAscii } from './helper.js';
import chalk from 'chalk';

export async function get() {
    const data = await readFile();
    for (let i = 0; i < data.length; i++) {
        console.log(chalk.yellow(data[i]))
    }
}

export async function add(item) {

    let response

    if (isListOfPokemons(item)) {
        const listOfPokemons = item.split(',');
        response = chalk.green("Pokemons added successfully :)")
        for (let i = 0; i < listOfPokemons.length; i++) {
            let pokemon = await getPokemon(listOfPokemons[i])
            if (pokemon === 0) {
                console.log(chalk.red(`Wrong Pokemon number --> ${listOfPokemons[i]}`))
                continue
            }
            pokemonToAscii(pokemon.data.sprites.front_default)
            pokemon = pokemon.data.name
            let doesPokemonExists = await pokemonExistsInTodoList(pokemon)
            if (!doesPokemonExists) {
                const res = await writeToFile(`catch ${pokemon}`)
                if (res !== "Item has been added :)") {
                    console.log(res)
                    response = chalk.red("Items have not been added :(")
                }
            } else {
                response = chalk.red("Some pokemons already exist")
            }
        }
    }
    else if (isPokemon(item)) {
        let pokemon = await getPokemon(item)
        if (pokemon === 0) {
            console.log(chalk.red("Wrong Pokemon number"))
            return
        }
        pokemonToAscii(pokemon.data.sprites.front_default)
        pokemon = pokemon.data.name
        let doesPokemonExists = await pokemonExistsInTodoList(pokemon)
        if (!doesPokemonExists) {
            response = await writeToFile(`catch ${pokemon}`)
        } else {
            response = chalk.red("Pokemon already exists :(")
        }

    } else {
        response = await writeToFile(item)
    }

    console.log(response)
    
}

export async function deleteItem(index) {
    try {
        let data = await readFile()
        if (index < 0 || data.length === 0 || index > data.length) {
            console.log("Index is out of bounds")
            return
        }
        data.splice(index, 1)
        await overwriteFile(data)
        console.log(chalk.green("Item deleted successfully :)"))
    } catch (e) {
        chalk.red(e)
    }
}