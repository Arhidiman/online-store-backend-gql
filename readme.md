# Режим разработки

В данном режиме для динамического формирования конечного суперграфа для удобства используется функция
IntrospectAndCompose

```



```

# Режим продакшна

Согласно официальной документации крайне не рекомендуется использовать IntrospectAndCompose на проде, поэтому  
используется статическая заранее сгенерированная суперграф-схема.  
Для этого запускается команда:  
`rover supergraph compose --config ./supergraph-config.yaml --output ./supergraph-schema.graphql`
Где:
- `rover supergraph compose` - собирает схему из подграфов каждого микросервиса
- `--config ./supergraph-config.yaml` указание пути к конфигурационному файлу сборки супперграфа.  
Пример .yaml файла:
`
federation_version: =2.9.0
subgraphs:
  products:
    routing_url: http://localhost:7000
    schema:
      file: ./products.graphql
  users:
    routing_url: http://localhost:8000
    schema:
      file: ./users.graphql
`
- `--output ./supergraph-schema.graphql` указание пути к файлу, в котором будет сформирован общий суперграф