import connectDB from '../../models/Mongodb'
import Book from '../../models/Book'

const handler = async (req, res) => {

    const { method } = req
    const { id } = req.query

    switch (method) {

        case 'GET':

            if (id) {
                await Book.findById(id, function (err, docs) {
                    return res.status(200).send(docs)
                });
            } else {
                await Book.find({}, function (err, docs) {
                    return res.status(200).send(docs)
                });
            }

            break;

        case 'POST':
            const { title, description, price, supplier } = req.body;
            try {
                const book = new Book({ 
                    title: title,
                    description: description,
                    price: price,
                    supplier: supplier
                });
                book.save(function (err, book) {
                    if (err) return res.status(401).send({message: 'Could not save'});
                    return res.status(200).send(book)
                });        
            } catch (error) {
                return res.status(500).send(error.message);
            }
            break;
        
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
};

export default connectDB(handler);