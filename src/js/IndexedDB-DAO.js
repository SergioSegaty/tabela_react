export default class TarefaDB {
    constructor(dbName, tableName) {
        this.dbName = dbName;
        this.tableName = tableName;
        this.startDB();
    }

    connection = async () => {
        return await window.indexedDB.open(this.dbName);
    };

    startDB = async () => {
        let req = await this.connection();

        req.onsuccess = () => { };

        req.onerror = (e) => {
            throw new Error(
                "Não foi possível conectar ao Banco de Dados: " + this.dbName
            );
        };

        req.onupgradeneeded = (e) => {
            let db = e.target.result;

            let store = db.createObjectStore(this.tableName, {
                keyPath: "id",
                autoIncrement: true,
            });

            store.createIndex("nome", "nome", { unique: false });
            store.createIndex('id', 'id', {unique: true});

            store.onsuccess = () => { };

            store.onerror = (e) => {
                throw new Error(
                    "Não foi possível atualizar o Banco de Dados: " + this.dbName
                );
            };
        };
    };

    insertToDB = async (item) => {
        return new Promise(async resolve => {
            let req = await this.connection();

            req.onsuccess = (e) => {
                let db = e.target.result;

                let store = db
                    .transaction(this.tableName, "readwrite")
                    .objectStore(this.tableName);

                let storeAdition = store.add(item);

                storeAdition.onsuccess = (e) => {
                    let id = e.target.result;
                    item.id = id;


                    resolve(item)
                    console.log("Adicionado novo item ao Banco. Id: " + id);
                };

                storeAdition.onerror = (e) => {
                    throw new Error("Não foi possível adicionar o Item ao Banco");
                };
            };
        })
    };

    removeFromDB = async (id) => {
        return new Promise(async resolve => {
            let req = await this.connection();
            req.onsuccess = e => {
                let db = e.target.result;

                let store = db
                    .transaction(this.tableName, 'readwrite')
                    .objectStore(this.tableName)
                    .delete(parseInt(id));

                store.onsuccess = (result) => {
                    resolve(result);
                }
            }
        })
    }

    updateById = async (item) => {
        let targetId = parseInt(item.id);
        let connection = await this.connection();

        connection.onerror = () =>{
            console.log('Deu bosta para atualizar');
        }

        connection.onsuccess = (e) => {
            let db = e.target.result;

            let request = db
                        .transaction(this.tableName, 'readwrite')
                        .objectStore(this.tableName)
                        .get(targetId);

            request.onerror = () => {
                throw new Error('Não foi possível pegar o Objeto com Id de: ' + targetId);
            }

            request.onsuccess = (e) => {
                let itemToUpdate = e.target.result;
                
                itemToUpdate = {
                    ...itemToUpdate,
                    desc: item.desc,
                    status: item.status,
                    data: item.data,
                }

                let requestUpdate = db
                                    .transaction(this.tableName, 'readwrite')
                                    .objectStore(this.tableName)
                                    .put(itemToUpdate);

                requestUpdate.onsuccess = () => {
                    console.log('O item de id: ' + itemToUpdate.id + ' Foi atualizado com sucesso');
                }

                requestUpdate.onerror = () => {
                    throw new Error('O item de id: ' + itemToUpdate.id + 'Não foi atualizado.');
                }
            }
        }

    }

    getAll = () => {
        return new Promise(async resolve => {
            let req = await this.connection();

            req.onsuccess = (e) => {
                let db = e.target.result;

                let store = db
                    .transaction(this.tableName)
                    .objectStore(this.tableName)

                store.getAll().onsuccess = resultado => {
                    resolve(resultado.target.result);
                };
            };

            req.onerror = e => {
                throw new Error(e);
            }
        })
    }
}
