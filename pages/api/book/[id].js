import connectDB from '../../../models/Mongodb'
import Book from '../../../models/Book'

const handler = async (req, res) => {

    const { method } = req
    const { id } = req.query
  
    switch (method) {
        case 'GET':
            await Book.findById(id, function (err, docs) {
                return res.status(200).send(docs)
            });
            break
        case 'PUT':
            const { title, description, price, supplier } = req.body
            const result = await Book.findByIdAndUpdate(id, {
                title: title, 
                description: description,
                price: price,
                supplier: supplier
            })
            res.status(200).json({
                result: result
            })
            break
        case 'DELETE':
            const deleteResult = await Book.findByIdAndDelete(id)
            res.status(200).json({
                result: deleteResult
            })
            break
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
export default connectDB(handler);