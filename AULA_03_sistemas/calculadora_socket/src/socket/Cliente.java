package socket;
import java.io.*;
import java.net.*;

public class Cliente {

    static Conexao c;
    static Socket socket;

    public Cliente() {
        try {
            socket = new Socket("localhost", 9600);
        } //Conection start
        catch (IOException e) {
            System.out.println("Nao consegui resolver o host...");
        }
    }

    public static void main(String args[]){
        String requisicao = "Cliente envia : Ol�, Servidor ";
        String texto;
        Cliente cliente = new Cliente();
        for (int i = 0; i < 10; i++) {
            Conexao.send(socket, requisicao);
            texto = Conexao.receive(socket);                    // fase de dados
            System.out.println(texto);
        }
        try {
            socket.close();                               // fase de desconexao
        } catch (IOException e) {
            System.out.println("Nao encerrou a conexao corretamente" + e.getMessage());
        }
    }
}
