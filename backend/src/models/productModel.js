import mongoose from 'mongoose';

export const PRODUCT_PROPS = {
    NAME: 'name',
    CATEGORY: 'category',
    SUB_CATEGORY: 'sub_category',
    PRICE: 'price',
    DESCRIPTION: 'description',
    STOCK: 'stock',
    IMAGES: 'images',
    CREATED: 'created'
}

const productSchema = new mongoose.Schema({
    [PRODUCT_PROPS.NAME]: { 
        type: String, 
        required: true 
    },
    [PRODUCT_PROPS.CATEGORY]: { 
        type: String, 
        required: true,
        enum: ['De Rio', 'De Mar'] 
    },
    [PRODUCT_PROPS.SUB_CATEGORY]: {
        type: String,
        validate: {
            validator: function(value) {
            const firstcategory = this[PRODUCT_PROPS.CATEGORY];
            if (firstcategory === 'De Rio') {
                return ['Trucha', 'Bagre', 'Carpa', 'Dorado', 'Surubi', 'Boga', 'Pacú', 'Pejerrey', 'Otro'].includes(value);
            }

            if (firstcategory === 'De Mar') {
                return ['Atún', 'Merluza', 'Salmón', 'Lenguado', 'Corvina', 'Pez Espada', 'Bonito', 'Otro'].includes(value);
            }

            return true;
        },
        message: props => 
            `${props.value} no es una subcategoría válida para la categoría ${props.instance[PRODUCT_PROPS.CATEGORY]}`
        }
    },
    [PRODUCT_PROPS.PRICE]: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    [PRODUCT_PROPS.DESCRIPTION]: { 
        type: String, 
        required: true 
    },
    [PRODUCT_PROPS.STOCK]: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    [PRODUCT_PROPS.IMAGES]: [{ 
        type: String 
    }],
    [PRODUCT_PROPS.CREATED]: { 
        type: Date, 
        default: Date.now 
    }
    });

    const Product = mongoose.model('Product', productSchema);
    export default Product;