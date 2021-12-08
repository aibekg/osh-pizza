
const useCheck = (basket, product) => {
    return basket.filter(item => item.id === product.id && item.title === product.title).length;
};

export default useCheck;
