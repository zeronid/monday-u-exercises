import axios from 'axios'
import fs from 'fs-extra'
import chalk from 'chalk';
import asciify from 'asciify-image'

export function isListOfPokemons(item) {
    if (item.includes(",") && JSON.stringify(item.split(",")) === JSON.stringify(item.split(",").filter(item => !isNaN(item)))) {
        return true
    }
    return false
}

export function isPokemon(item) {
    if (!isNaN(item)) return true
    return false
}

export async function getPokemon(num) {
    const url = `https://pokeapi.co/api/v2/pokemon/${num}`
    const pokeName = await axios.get(url).then(res => {
        return res
    }).catch(e => {
        return 0
    })
    return pokeName
}

export async function readFile() {
    try {
        const data = await fs.readFile("list.json");
        return JSON.parse(data.toString());
    } catch (error) {
        return error
    }
}

export async function pokemonToAscii(url) {
    const options = { fit: 'none', width: 20, height: 20, color: true }
    await asciify(url, options, (err, res) => {
        console.log(err || res)
    })
}

export async function writeToFile(item) {
    try {
        let data = await readFile()
        data.push(item)
        await fs.writeFile("list.json", JSON.stringify(data))
        return chalk.green("Item has been added :)")
    } catch (error) {
        return error
    }
}

export async function overwriteFile(newFile) {
    try {
        await fs.writeFile("list.json", JSON.stringify(newFile))
    } catch (error) {
        console.log(error)
    }
}

export async function pokemonExistsInTodoList(pokemon) {
    const list = await readFile()
    if (list.includes(`catch ${pokemon}`)) return true
    return false
}