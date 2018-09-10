package main

import (
	"log"
	"net/http"

	"github.com/dheeraj-coding/websocket_chat/chat"
)

func main() {
	hub := chat.NewHub()
	go hub.Run()
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		chat.ServeConnection(hub, w, r)
	})
	log.Fatal(http.ListenAndServe(":8080", nil))
}
