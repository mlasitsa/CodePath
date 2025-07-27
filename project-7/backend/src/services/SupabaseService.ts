import { supabase } from "../config/supabase";

type WhereClause = {column: string, value: any }

export class SupabaseService {
    async create<T>(table: string, payload: T) {
        const {data, error} = await supabase.from(table).insert(payload)
        if (error) {
            throw error
        }
        return data
    }

    async read(table: string, filters?: WhereClause[]) {
        let query = supabase.from(table).select('*');
        if (filters) {
            filters.forEach(({column, value}) => {
                query = query.eq(column,value)
            })
        }
        const {data, error} = await query
        if (error) throw error;
        return data
    }

    async update<T>(table: string, updates: Partial<T>, filters: WhereClause[]) {
        let query = supabase.from(table).update(updates);
        filters.forEach(({ column, value }) => {
          query = query.eq(column, value);
        });
        const { data, error } = await query.single();
        if (error) throw error;
        return data;
      }
    
      async delete(table: string, filters: WhereClause[]) {
        let query = supabase.from(table).delete();
        filters.forEach(({ column, value }) => {
          query = query.eq(column, value);
        });
        const { error } = await query;
        if (error) throw error;
      }

}