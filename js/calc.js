function Calculator(form, summary) {
    this.prices = {
        products: 0.5,
        orders: 0.5,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    };

    this.form = {
        products: form.querySelector("#products"),
        orders: form.querySelector("#orders"),
        package: form.querySelector("#package"),
        accounting: form.querySelector("#accounting"),
        terminal:   form.querySelector("#terminal")
    };

    this.summary = {
        products: summary.querySelector('[data-id = products]'),
        orders: summary.querySelector('[data-id = orders]'),
        package: summary.querySelector('[data-id = package]'),
        accounting: summary.querySelector('[data-id = accounting]'),
        terminal: summary.querySelector('[data-id = terminal]'),
        total: summary.querySelector("#total-price")
    };
    this.addEvents();
    this.total();
};

Calculator.prototype.addEvents = function (e){
    this.products();
    this.orders();
    this.package();
    this.accounting();
    this.terminal();
};

Calculator.prototype.products = function(e){
    this.form.products.addEventListener("keyup",(event)=>{
        const result = form.products.value * this.prices.products;
        this.summary.products.classList.add("open");
        this.summary.products.children[1].innerText = this.form.products.value + " * " + this.prices.products + "$";
        this.summary.products.children[2].innerText = result + "$";
        this.total();
    })
};
Calculator.prototype.orders = function(e){
    this.form.orders.addEventListener("keyup",(event)=>{
        const result = this.form.orders.value * this.prices.products;
        this.summary.orders.classList.add("open");
        this.summary.orders.children[1].innerText = this.form.orders.value + " * " + this.prices.orders + "$";
        this.summary.orders.children[2].innerText = result + "$";
        this.total();
    })
};

Calculator.prototype.package = function (e){
    this.form.package.addEventListener("click", this.selectEvent.bind(this));
};

Calculator.prototype.selectEvent = function (e) {

    const value = typeof e.target.dataset.value !== "undefined" ? e.target.dataset.value : "";
    const text = typeof e.target.dataset.value !== "undefined" ? e.target.innerText : "Choose package";

    this.form.package.classList.toggle("open");

    if (value.length > 0) {
        this.form.package.dataset.value = value;
        this.form.package.querySelector(".select__input").innerText = text;
        this.summary.package.classList.add("open");
        this.summary.package.children[1].innerText = text;
        if(text === "Basic"){
            this.summary.package.children[2].innerText = "$" + this.prices.package.basic;
        }else if(text === "Professional"){
            this.summary.package.children[2].innerText = "$" + this.prices.package.professional;
        }else if(text === "Premium"){
            this.summary.package.children[2].innerText = "$" + this.prices.package.premium;
        }
        this.total();
    }else {
        this.summary.package.classList.remove("open");
    }
};

Calculator.prototype.accounting = function (e) {
    this.form.accounting.parentElement.addEventListener("change", (event)=>{
        this.summary.accounting.classList.toggle("open");
        this.summary.accounting.children[1].innerText = "$" + this.prices.accounting;
        this.total();
    })
};

Calculator.prototype.terminal = function (e) {
    this.form.terminal.parentElement.addEventListener("change", (event)=>{
        this.summary.terminal.classList.toggle("open");
        this.summary.terminal.children[1].innerText = "$" + this.prices.terminal;
        this.total();
    })
};

Calculator.prototype.total = function (e) {
    this.summary.total.classList.add("open");
    this.summary.total.children[1].innerText = "$" + 0;
    const show = document.querySelectorAll(".open").length > 0;
    if(show){
        const productSum = this.form.products.value < 0 ? 0 : this.form.products.value * this.prices.products;
        const ordersSum = this.form.orders.value < 0 ? 0 : this.form.orders.value * this.prices.orders;
        const packagePrice = this.form.package.dataset.value.length === 0 ? 0 : this.prices.package[this.form.package.dataset.value];
        const accounting = this.form.accounting.checked ? this.prices.accounting : 0;
        const terminal = this.form.terminal.checked ? this.prices.terminal : 0;

        this.summary.total.children[1].innerText = "$" + (productSum + ordersSum + packagePrice + accounting + terminal);
    }
};

const form = document.querySelector(".calc__form");
const summary = document.querySelector(".calc__summary");

const calc = new Calculator(form, summary);
