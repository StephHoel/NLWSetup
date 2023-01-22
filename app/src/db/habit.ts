import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';
import { z } from 'zod';

const db = SQLite.openDatabase('database.db')

export async function createHabit(title: string) {
   const nTitle = z.string().parse(title).trim()
   const id = uuid.v4().toString()
   const date = new Date().toISOString()

   try {
      db.transaction(tx => {
         console.log(`Entrou na transaction\nTitulo: ${nTitle}\nID: ${id}\nData: ${date}`);
         tx.executeSql(
            'INSERT INTO habits (id, title, created_at) VALUES (?,?,?)',
            [id, nTitle, date],
            (tx, results) => {
               console.log('Results: ', results, tx);

               results.rowsAffected > 0
                  ? console.log('Hábito criado com sucesso')
                  : console.log('Falha ao criar um hábito')
            }
         );
      });
   } catch (error) {
      console.log(`erro ${error}`)
   } finally {
      console.log('não fez nada')
   }
}
export const readHabit = async () => {

}
export const updateHabit = async () => {

}
export const deleteHabit = async () => {

}