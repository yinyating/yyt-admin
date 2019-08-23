module.exports = {
    list(req, res, next){
        // res.send('ok')
        res.json({
            ret: true,
            data: [
                {
                    task: 'aaa'
                },
                {
                    task: 'bbb'
                },
                {
                    task: 'ccc'
                }
            ]
        })
    }
}