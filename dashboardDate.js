import userData from "./userData.js";

const display = document.querySelector(".display");

function Painel() {

    const data = new Date();

    function idadeHoje(anoAniversario, mesAniversario, diaAniversario) {
        let anoAtual = data.getFullYear(), mesAtual = data.getMonth() + 1, diaAtual = data.getDay();

        anoAniversario = +anoAniversario;
        mesAniversario = +mesAniversario;
        diaAniversario = +diaAniversario;

        let idadeAtual = anoAtual - anoAniversario;

        if (mesAtual < mesAniversario || mesAtual == mesAniversario && diaAtual < diaAniversario) {
            idadeAtual--;
        }

        if (idadeAtual <= 1) {
            return "1 ano";
        } else {
            return idadeAtual < 0 ? 0 : idadeAtual + " anos";
        }
    }

    function contagem(mesAniversario, diaAniversario) {
        const updateElement = document.getElementById("contagem")

        const atualizador = () => {
            const dataAtual = new Date();
            const anoAtual = dataAtual.getFullYear();
            const proximoAniversario = new Date(anoAtual, mesAniversario - 1, diaAniversario);

            if (proximoAniversario < dataAtual) {
                proximoAniversario.setFullYear(anoAtual + 1);
            }

            const difference = proximoAniversario - dataAtual;

            const dias = Math.floor(difference / (1000 * 60 * 60 * 24));
            const horas = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((difference % (1000 * 60)) / 1000);

            return `${dias} dias - ${horas < 10 ? "0" + horas : horas}:${minutos < 10 ? "0" + minutos : minutos}:${segundos < 10 ? "0" + segundos : segundos}`;
        }

        setInterval(() => {
            return atualizador();
        }, 1000);
        return atualizador();
    }

    campoLogin.remove();

    const bntSair = document.createElement("button");
    const users = document.createElement("div");
    users.className = "users";
    bntSair.className = "btnSair";
    bntSair.innerText = "Sair";
    bntSair.addEventListener("click", () => {
        window.location.reload();
    });
    display.appendChild(bntSair);

    userData.map(item => {
        const user = document.createElement("div");
        user.className = "user";

        const nome = document.createElement("h1");
        nome.className = "nome";
        nome.innerText = item.nome;

        const dataNascimento = document.createElement("p");
        dataNascimento.className = "nascimento";
        dataNascimento.innerText = `${item.dia < 10 ? "0" + item.dia : item.dia}/${item.mes < 10 ? "0" + item.mes : item.mes}/${item.ano}`;

        const idade = document.createElement("span");
        idade.innerText = `${idadeHoje(item.ano, item.mes, item.dia)}`;

        const contagemData = document.createElement("div");
        contagemData.id = "contagem";
        contagemData.innerHTML = contagem(item.mes, item.dia);

        const regre = () => {
            contagemData.innerHTML = contagem(item.mes, item.dia);
        }
        setInterval(regre, 1000);

        user.appendChild(nome);
        user.appendChild(dataNascimento);
        user.appendChild(idade);
        user.appendChild(contagemData);
        users.appendChild(user);

        display.appendChild(users);

    });
}

const campoLogin = document.createElement("div");
campoLogin.className = "login";

const labelUser = document.createElement("label");
const user = document.createElement("input");
const labelPwd = document.createElement("label");
const pwd = document.createElement("input");
const btnLogin = document.createElement("button");

function verificar(userUser, pwdUser) {
    const userFind = userData.find((item) => item.user == userUser.value && item.pwd == pwdUser.value);
    if (userFind) {
        Painel();
    } else {
        alert("Login não encontrados");
    }
}
labelUser.innerText = "Usuário";
labelUser.htmlFor = "user";
user.name = "user";
user.type = "text";
user.className = "userLogin";
labelPwd.innerText = "Senha";
labelPwd.htmlFor = "senha";
pwd.name = "senha";
pwd.type = "password";
pwd.className = "userLogin";
btnLogin.innerText = "Entrar";
btnLogin.className = "btnLogin";
btnLogin.type = "submit";

function entrar() {
    verificar(user, pwd);
}

btnLogin.addEventListener("click", () => {
    entrar();
})

document.addEventListener("keydown", (action) => {
    if (action.key === "Enter") {
        action.preventDefault();
        console.log("enter");
        entrar();
    }
});

campoLogin.appendChild(labelUser);
campoLogin.appendChild(user);
campoLogin.appendChild(labelPwd);
campoLogin.appendChild(pwd);
campoLogin.appendChild(btnLogin);

display.appendChild(campoLogin)
