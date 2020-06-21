let dbPromised = idb.open("football-data-org", 1, function (upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("matches", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("competition.name", "competition.name", {
        unique: false
    });
});


const saveForLater = matches => {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("matches", "readwrite");
            let store = tx.objectStore("matches");
            console.log(matches);
            store.put(matches.match);
            return tx.complete;
        })
        .then(function () {
            M.toast({
                html: 'Pertandingan Berhasil Disimpan!'
            });
        });
}

const getAll = () => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("matches", "readonly");
                let store = tx.objectStore("matches");
                return store.getAll();
            })
            .then(function (matches) {
                resolve(matches);
            });
    });
}

const getById = id => {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("matches", "readonly");
                let store = tx.objectStore("matches");
                return store.get(id);
            })
            .then(function (matches) {
                resolve(matches);
            });
    });
}

const deleteSaved = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            const tx = db.transaction('matches', 'readwrite');
            const store = tx.objectStore('matches');

            store.delete(id);
            return tx.complete;
        }).then(function () {
            M.toast({
                html: 'Pertandingan Berhasil Dihapus!'
            });
            resolve(true);
        });
    });
}