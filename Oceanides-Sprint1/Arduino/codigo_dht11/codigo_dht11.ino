#include "DHT.h"
#define dht_type DHT11 

int dht_pin = A2;
DHT dht_11 = DHT(dht_pin, dht_type); 
int lm35_pin = A0, leitura_lm35 = 0;
float temperatura;
int ldr_pin = A5, leitura_ldr = 0;
int switch_pin = 7;
void setup() {
  Serial.begin(9600);
  dht_1.begin();
  pinMode(switch_pin, INPUT);
}

void loop() {

  float umidade = dht_1.readHumidity();
  float temperatura = dht_1.readTemperature();
  if (isnan(temperatura) or isnan(umidade))
  {
  Serial.println("Erro ao ler o DHT");
  }
  else
  {
  Serial.print(umidade);
  Serial.print(";");
  Serial.print(temperatura);
  Serial.print(";");
  }

  leitura_lm35 = analogRead(lm35_pin);
  temperatura = leitura_lm35 * (5.0/1023) * 100;
  Serial.print(temperatura);
  Serial.print(";");

  leitura_ldr = analogRead(ldr_pin);
  Serial.print(leitura_ldr);
  Serial.print(";");

  if(digitalRead(switch_pin) == LOW){
  Serial.println(7);
  }
  else {
  Serial.println(0);
  }
  delay(2000);
}