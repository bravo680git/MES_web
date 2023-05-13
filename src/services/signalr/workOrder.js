import connection from "./connection"

const handleGetWorkOrderProgress = (resolve, reject) => {
    connection
        .start()
        .then((conn) => {
            conn.on("UpdateWorkOrderProgress", resolve)
        })
        .catch(reject)

    return connection
}

export { handleGetWorkOrderProgress }
