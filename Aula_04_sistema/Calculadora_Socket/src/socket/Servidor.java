package socket;

import java.net.*;

public class Servidor {

    static ServerSocket serversocket;
    static Socket client_socket;
    static Conexao conexao;
    static String msg;

    public Servidor() {

        try {
            serversocket = new ServerSocket(9600);
            System.out.println("Calculadora distribuida no ar ...");
        } catch (Exception e) {
            System.out.println("Nao criei o server socket...");
        }
    }

    public static void main(String args[]) {
        
        new Servidor();
        if (connect()) {
            /*
            insira os códigos do servidor aqui
            */
            MsgReq requisicao = (MsgReq)Conexao.receive(client_socket);
            System.out.println("NUM1: "+requisicao.getNum1());
            System.out.println("NUM2: "+requisicao.getNum2());
            System.out.println("OPERACAO: "+requisicao.getOperacao());
            try {
                client_socket.close();
                serversocket.close();
            } // desconexao
            catch (Exception e) {
                System.out.println("N�o encerrou a conex�o corretamente" + e.getMessage());
            }
        }
    }

    static boolean connect() {
        boolean ret;
        try {
            client_socket = serversocket.accept();              // fase de conexão
            ret = true;
        } catch (Exception e) {
            System.out.println("N�o fez conex�o" + e.getMessage());
            ret = false;
        }
        return ret;
    }
}
