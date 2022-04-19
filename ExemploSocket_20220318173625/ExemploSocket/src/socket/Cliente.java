package socket;
import java.io.*;
import java.net.*;

public class Cliente {

    static Conexao c;
    static Socket socket;

    public Cliente() {
        try {
            socket = new Socket("localhost", 9600);
        } // fase de conex�o
        catch (Exception e) {
            System.out.println("Nao consegui resolver o host...");
        }
    }

    public static void main(String args[]){
        String requisicao = "Cliente envia : Ol�, Servidor ";
        String texto;
        new Cliente();
        for (int i = 0; i < 10; i++) {
            c.send(socket, requisicao);
            texto = c.receive(socket);                    // fase de dados
            System.out.println(texto);
        }
        try {
            socket.close();                               // fase de desconex�o
        } catch (IOException e) {
            System.out.println("N�o encerrou a conex�o corretamente" + e.getMessage());
        }
    }
}