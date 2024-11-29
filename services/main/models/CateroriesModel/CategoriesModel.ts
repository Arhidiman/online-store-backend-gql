import { queries } from "./queries.ts";
import { dbClient } from "../../db/dbCLient.ts";

class CategoriesModel {

    async getAll() {
        
        const categories =  (await dbClient.query(queries.categories())).rows

        console.log(categories)
        return categories

    }

}


export default new CategoriesModel()