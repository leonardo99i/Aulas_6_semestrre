package socket;

import java.io.*;
import java.net.*;
import java.util.Scanner;

public class Cliente {

    static Conexao conexao;
    static Socket socket;

    public Cliente() {
        try {
            socket = new Socket("localhost", 9600);
        } // fase de conexao
        catch (Exception e) {
            System.out.println("Nao consegui resolver o host...");
        }
    }

    public static void main(String args[]){
        
        new Cliente();
        try (/*
                insira os códigos do cliente aqui
                */
        var in = new Scanner(System.in)) {
            System.out.println("*****************");
            System.out.println("Calculadora cliente");
            System.out.println("******************\n");
            System.out.println("Digite o primeiro numero");
            float num1 = in.nextFloat();
            System.out.println("Digite o segundo numero");
            float num2 = in.nextFloat();
            System.out.println("Digite a operacao");
            char operacao = in.next().charAt(0);
            
            MsgReq requisicao = new MsgReq(num1, num2, operacao);
            Conexao.send(socket, requisicao);
        }
        try {
            socket.close();                       
        } catch(IOException e) {
            System.out.println("Nao encerrou a conexao corretamente" + e.getMessage());
        }
    }
}

