    function getProductElements(product) {
        return {
            primaryImage: product.querySelector('[data-placeholder="primaryImg"]'),
            secondaryImage: product.querySelector('[data-placeholder="secondaryImg"]'),
            price: product.querySelector('[data-placeholder="price"]'),
            saleBadge: product.querySelector('[data-placeholder="sale-badge"]'),
            buttons: product.querySelectorAll('[data-button]')
        };
    }

    function updateImages(elements, variant){
        const {image, secondaryImage, titleAlt} = variant;

        elements.primaryImage.setAttribute('src', image);
        elements.primaryImage.setAttribute('alt', titleAlt);
        
        elements.secondaryImage.setAttribute('src', secondaryImage);
        elements.secondaryImage.setAttribute('alt', titleAlt);
    }

    function priceToNumber(price){
        return Number(price.replace(/[^0-9.-]+/g, ""));
    }

    function updatePrice(elements, variant){
        const {price, compareAtPrice} = variant;
        const ifOnSale = compareAtPrice && priceToNumber(price) < priceToNumber(compareAtPrice);

        elements.saleBadge.classList.toggle('hidden', !ifOnSale);
        
        elements.price.innerHTML = `
            ${ifOnSale ? `<span class="line-through">${compareAtPrice}</span>` : ''}
            <span class="${ifOnSale ? 'text-red-500' : ''}">${price}</span>
        `
    }

    function highlightButton(elements, id){
        elements.buttons.forEach(b => {
            if(Number(b.dataset.button) !== id) b.classList.remove('outline-1');
            else  b.classList.add('outline-1');
        }) 
    }

    function selectProductVariant(variantsArr, productId, variantId){
        const variant = variantsArr.find(v => v.id === parseInt(variantId));
        if (!variant) return;

        const productCard = document.querySelector(`[data-product="${productId}"]`);
        const elements = getProductElements(productCard);
       
        highlightButton(elements, variant.id);
        updatePrice(elements, variant);
        updateImages(elements, variant);
    }