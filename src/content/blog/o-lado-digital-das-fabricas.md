---
title: "O lado digital das fábricas"
description: ""
publishedAt: 2026-07-16
tags: []
---

Nos meus seis meses em manufatura, vim a perceber que estamos extremamente atrasados face àquilo que é o desenvolvimento da tecnologia de uso para o consumidor. 

A minha primeira função na fábrica foi a de fabricar - passar pelo processo todo no chão da fábrica, sentir as dores e comunicá-las. Nesse sentido fui efetivo, mas a minha natureza leva-me a tentar substituir a  minha função por um engenho. 

Comecei por perceber que uma das grandes limitações para os donos não perceberem o degredo em que a fábrica se tinha tornado era o facto de não verem o que estavam a fazer. Estavam a conduzir vendados. Não têm tempo para ir ao chão da fábrica e a ouvir os trabalhadores. 

Todas as sugestões que eu fiz aos donos vieram dos trabalhadores do chão da fábrica. Todas as sugestões que eu fiz foram implementadas, por mais caras que fossem, porque após uma simples investigação os donos perceberam que eram limitações reais.

As fábricas têm, por necessidade, bom rastreamento do lado financeiro (é ilegal não ter), o que inclui encomendas, faturas, etc. Desse lado os dados estão bem organizados - há soluções para aumentar a produtividade.

Essa necessidade não existe do lado da produção, e portanto os donos satisfazem-se desde que o verde seja maior do que o vermelho, mas não vêm o desperdício que está a acontecer.

Na prática o que vai ter que acontecer - um produto com duas frentes. 

A primeira é a visibilidade do chão da fábrica - é aqui que o pessoal gosta de usar a dashboard. Na prática a dashboard não faz sentido nenhum. O dono não está assim tão interessado na produção. O que eles querem ver é se alguma coisa está a dar merda (um aviso!) e quanta merda é que está a dar (custo de oportunidade, perdas realizadas, e perdas por unidade de tempo até ao longo do tempo (tipo um calendário em que se vê as perdas à medida que se acrescentam dias).  O que eles querem mais ainda são decisões, e decisões que sejam justificadas claramente (o verde tem que aumentar e o vermelho tem que diminuir - ao longo de quanto tempo, quando é que vai realizar retorno, etc.). A dashboard é uma perk, tem que existir, mas não é um produto. O produto é conseguirmos dar a entender a um CEO se vale a pena comprar um robô novo para uma certa função, quanto é que pode pagar e fazer sentido, quando é que se vai realizar o retorno; ou se vale a pena recrutar uma pessoa para um certo cargo, que tipo de pessoa, quanto lhe deve pagar. 

Para haver esta visibilidade, é necessário que haja rastreamento, e na maioria das PMEs falta apenas que acompanhado do produto a ser fabricado, esteja uma ficha com a informação do que aconteceu, está a acontecer, e vai acontecer. Isso é o que se chama um roteiro de fabrico - e associadas ao roteiro, numa produção de alto nível, podem estar dezenas de pessoas.

As consultoras vendem a ideia de que aumentam a eficiência de processos industriais, e é verdade - cortam tempos de espera entre operações, reduzem o stock intermédio, tentam reduzir o stock final - criar uma fábrica lean. O que não consideram, no entanto, é o futuro da fábrica. O futuro não tem humanos em fábricas. A kaizen resolve um problema único no tempo e no espaço. Otimiza para hoje, mas amanhã a fábrica já cresceu, já precisa de outra coisa, e o dono continua sem saber porquê, as consultoras continuam a vender a ideia de que são mágicos, eventualmente a empresa já não tem dinheiro para a sustentar, saem de lá, a info sai com eles e a fábrica fica parada no tempo. Resolvemos esse problema com a visibilidade e custo.

A segunda parte do produto é automatizar o “trabalho não produtivo” - tudo aquilo pelo qual um cliente não está disposto a pagar - que as consultoras não estão a considerar. As equipas de office set-up.

Uma das coisas pelas quais o cliente está MAIS disposto a pagar é o time-to-market. Para tal é necessário fazer um bom planeamento da produção. Maior parte das fábricas de dimensão maior atira dinheiro e pessoas a este problema, e ele fica parcialmente resolvido, mas muito pouco otimizado. Já vi fábricas com equipas de planeamento de mais do que 10 pessoas, tudo para terem uma rule set de prioridades baseadas em “cliente” e “data de entrega” a tomar as decisões por eles. As pessoas só estão lá a mexer itens num gantt chart. A fábrica deveria estar disposta a pagar MUITO por isto, porque é trabalho libertado das pessoas e, em princípio, fica um gantt muito mais otimizado, em que podem contabilizar coisas como manutenção, avarias, e rápidamente reorganizar os lotes da melhor forma, considerando matéria prima, mesmo set-up para lotes diferentes, etc. = reduzem o seu time-to-market médio.

Para haver um planeamento tem que haver o roteiro de fabrico. No mínimo tem que haver só a ficha, mas cada pedaço de informação adicional que é associado a um roteiro de fabrico cria um leque de possibilidades.

O roteiro de fabrico pode ter associado o consumo teórico de material antes do início do fabrico, e o consumo de material real depois do fabrico. A saída de material do armazém menos o peso final da peça dá uma estimativa do peso desperdiçado por peça, mas o mais interessante seria conseguir discretizar por tipo de material. Por exemplo, um tapete é fabricado com 10 cores, o armazém tem que contabilizar as existências por cor, mas o peso final também tem se vamos contabilizar desperdício por cor. Entra aí a sensorização - é necessária uma balança e uma câmara. Inicialmente faz-se tudo isto no tablet do trabalhador, sem sensores, e vai ter que funcionar, mas convencem-se os donos a investir na sensorização porque eles têm que se preparar para a automação, senão vão ser substituídos por fábricas automáticas.

Controlo de qualidade na maioria dos casos é busy work - nunca se resolve o problema base. Para haver um bom cotrolo de qualidade, a nossa plataforma junta-a a todo o resto da informação que vai com o roteiro de fabrico, e com base no tipo de inconformidade, consegue prever a causa, dando um score de qualidade à máquina ou pessoa que fez essa operação - passa a ser um problema com solução. E mais uma vez, isto tem que ter associado o dinheiro que isto está a custar, senão as pessoas não vão olhar para um score de qualidade baixo com seriedade. A kaizen caga no controlo de qualidade por não ter solução. Nós fazemos a solução.

---

IndustryOS está above, abaixo está o ERP, produto superior.

Extra:

Trabalhar com consumo de material significa trabalhar com stock, e trabalhar com stock é das coisas mais complexas.

Se a fábrica produz para stock temos que definir stock mínimo, ponto de encomenda, etc. Isso pode-se fazer automáticamente também - é tempo desperdiçado se estiver um humano nesse loop - é um aumento do time to market (que a kaizen tambem nao considera).

Para definir o stock minimo e ponto de encomenda, é necessário um software de simulação e otimização - o estado da arte são os Temporal Fusion Transformers. É isso que vamos incorporar. A fábrica volta a ser lean no aspeto que a kaizen não considera.

Faturação. A faturação é uma das principais chatices para as fábricas. É uma dor séria e automatizá-la é um nice-to have, mas não acho que seria valorizada o suficiente quanto uma solução standalone.

Tempos intermédios - é uma das coisas mais fáceis de contabilizar. É quando o lote está em fabrico mas não está associado a nenhuma operação.

Quando o ciclo de produção fecha o produto passa para o armazém de expedição. O tempo que ele passa nesse armazém, ou em qualquer armazém intremédio, também tem um custo associado. É importante que o cliente saiba este custo.

Conhecendo os tempos intermédios e custos de stock intermédio, o dono consegue fazer o trabalho da kaizen - é simples, e pode ter sugestões de IA aqui para reorganização da linha de produção.

O grande problema dos dados é que devemos também considerar. Os dados inseridos por humanos são OK. Vêm com falhas, vêm atrasados, às vezes nem vêm, portanto precisamos de sensorizar as coisas - até porque daqui a uns anos vai ser o robô a operar e não vai fazer sentido haver um humano apenas para inserir valores num tablet.

Com dados bons podemos fazer também outras coisas. Abre um potencial enorme de coisas aliás, coisas que ainda não fazem sentido, que ainda não percebemos. Podemos pegar nos dados de vendas, fazer testes de personalidade as pessoas, e perceber o perfil de quem vende melhor. O mesmo para pessoal da produção. Podemos ver produtividade por pessoa e perceber se é vantajoso as pessoas trabalharem mais de manhã/tarde/noite. Tirar temperatura e humidade na fábrica toda também é uma necessidade que não é satisfeita.

O potencial é infinito. As fábricas estão mesmo atrasadas face àquilo que é a tecnologia de consumidor, para a maior parte dos casos é pegar na que já existe e aplicá-la.

O produto deve ser plug-and-play. Nós não queremos fazer setup nenhum, o setup que for para ser feito tem que ser do lado da fábrica, eles é que o têm que fazer, da mesma forma que eu tenho que fazer o setup da minha conta google. A sensorização também faz sentido que sejam eles, e para isso o setup tem que ser extremamente simples. Tem que ser uma questão só de colocar lá o sensor e ligá-lo à rede, o IndustryOS tem depois que o encontrar.

Para setups iniciais faz sentido correr um agente de IA - ele tem que percorrer as bases de dados e perceber onde é que está a informação existente toda para a associar aos módulos corretos (no caso de integração ou merge de plataforma). Automatizar o merge também faz sentido.

Nos meus seis meses em manufatura, vim a perceber que estamos extremamente atrasados face àquilo que é o desenvolvimento da tecnologia de uso para o consumidor.

A minha primeira função na fábrica foi a de fabricar — passar pelo processo todo no chão da fábrica, sentir as dores e comunicá-las. Nesse sentido fui efetivo, mas a minha natureza leva-me a tentar substituir a minha função por um engenho.

Comecei por perceber que uma das grandes limitações para os donos não perceberem o degredo em que a fábrica se tinha tornado era o facto de não verem o que estavam a fazer. Estavam a conduzir vendados. Recusam-se a ir ao chão da fábrica e a ouvir os trabalhadores.

Todas as sugestões que eu lhes fiz, depois de uma filtragem de linguagem, vieram dos trabalhadores do chão da fábrica — as pessoas da "classe inferior", com quem os donos se recusavam a falar. Todas as sugestões que eu fiz (e percebi isto agora mais recentemente que voltei a visitar o chão daquela fábrica em específico depois de umas semanas) foram implementadas, por mais caras que fossem, porque após uma simples investigação os donos perceberam que eram limitações reais.

O problema da comunicação humana é solucionável de duas formas. Ou se substitui o humano, ou se ganha colhões. O meu respeito está com aqueles que têm os colhões, mas infelizmente não consigo solucionar o problema — é individual, psicológico. O outro consigo. E solucionei.

As fábricas têm, por necessidade, bom rastreamento do lado financeiro (é ilegal não ter), o que inclui encomendas, faturas, etc. Desse lado os dados estão bem organizados — há soluções para aumentar a produtividade, e vamos fazê-las — vamos fazer o primeiro software de faturação automatizada certificado pela Autoridade Tributária (nunca foi feito porque é necessária certificação, e as pessoas têm medo da palavra certificação, está mal pintada, e portanto não vêm os específicos. Esta certificação é gratuíta e rápida, são apenas requisitos de formatação e bloqueio dos dados).

Mas essa necessidade não existe do lado da produção, e portanto os donos satisfazem-se desde que o verde seja maior do que o vermelho, mas não vêm o desperdício que está a acontecer.

Isto só é o caso para os donos que nunca quiseram realmente saber da produção em si, nunca tiveram esse gosto. Não vão ao chão da fábrica, têm nojo. Querem só ver mais verde do que vermelho — e portanto podemos inferir o perfil destes clientes e organizar bem um pitch direcionado a isso.

Na prática o que vai ter que acontecer — um produto com duas frentes, mas com uma só espinha. **A espinha é o rastreamento das ordens de fabrico. É isso que vendemos, e é isso que torna tudo o resto possível — principalmente o planeamento, que é onde está o dinheiro a sério.**

A primeira frente é a visibilidade do chão da fábrica — é aqui que o pessoal gosta de usar a dashboard. Na prática a dashboard não faz sentido nenhum. O dono, como já estabelecemos, não está assim tão interessado na produção, tanto como qualquer pessoa que está no escritório, ou qualquer pessoa que efetivamente iria ver uma dashboard deste tipo. O que eles querem ver é se alguma coisa está a dar merda (aviso!) quanta merda é que está a dar (custo de oportunidade, perdas realizadas, e perdas por unidade de tempo até ao longo do tempo (tipo um calendário em que se vê as perdas à medida que se acrescentam dias). O que eles querem mais ainda são decisões, e decisões que sejam justificadas claramente (o verde tem que aumentar e o vermelho tem que diminuir — ao longo de quanto tempo, quando é que vai realizar retorno, etc.). A dashboard é uma perk, tem que existir, mas não é um produto. O produto é conseguirmos dar a entender a um CEO se vale a pena comprar um robô novo para uma certa função, quanto é que pode pagar e fazer sentido, quando é que se vai realizar o retorno. Para ter esta visibilidade, é necessário que haja rastreamento, e na maioria das PMEs falta apenas que acompanhado do produto a ser fabricado, esteja uma ficha com a informação do que aconteceu, está a acontecer, e vai acontecer. Isso é o que se chama uma ordem de fabrico — e associada à ordem de fabrico, numa produção de alto nível, podem estar dezenas de pessoas.

É aí que entra a segunda frente — e é esta que vendemos, porque é esta que paga. **O rastreamento das ordens de fabrico não é um fim em si; é o que alimenta o planeamento.** A Kaizen vende a ideia de que aumentam a eficiência de processos industriais, e é verdade — cortam tempos de espera entre operações, reduzem o stock intermédio, tentam reduzir o stock final — criar uma fábrica lean. O que a kaizen não considera, no entanto, é o futuro. Estão presos a um processo. O futuro não tem humanos em fábricas, e as otimizações que eles fazem são o tipo de coisa que passa a ser feito na construção da máquina que vai substituir o humano. A kaizen resolve um problema único no tempo e no espaço. Otimiza para hoje, mas amanhã a fábrica já cresceu, já precisa de outra coisa, e o dono continua sem saber porquê, a kaizen continua a vender a ideia de que são mágicos, eventualmente a empresa já não tem dinheiro para a sustentar, saem de lá, a info sai com eles e a fábrica fica parada no tempo. Resolvemos esse problema porque a proposta é fazer um produto que automatiza o dito "trabalho não produtivo" — tudo aquilo pelo qual um cliente não está disposto a pagar.

Uma das coisas pelas quais o cliente está MAIS disposto a pagar é o time-to-market. Para tal é necessário fazer um bom planeamento da produção. **É aqui que está o produto.** Maior parte das fábricas de dimensão maior atira dinheiro e pessoas a este problema, e ele fica parcialmente resolvido, mas muito pouco otimizado. Já vi fábricas com equipas de planeamento de mais do que 10 pessoas, tudo para terem uma rule set de prioridades baseadas em "cliente" e "data de entrega" a tomar as decisões por eles. As pessoas só estão lá a mexer itens num gantt chart. A fábrica deveria estar disposta a pagar MUITO por isto, porque é trabalho libertado das pessoas e, em princípio, fica um gantt muito mais otimizado, em que podem contabilizar coisas como manutenção, avarias, e rápidamente reorganizar os lotes da melhor forma, considerando matéria prima, mesmo set-up para lotes diferentes, etc. = reduzem o seu time-to-market médio. **Vendemos o rastreamento porque é o que torna este planeamento possível; vendemos o planeamento porque é o que a fábrica está disposta a pagar caro. Uma coisa não existe sem a outra, e é esse o par que constitui o produto.**

Para haver um planeamento tem que haver o roteiro de fabrico. No mínimo tem que haver só a ficha, mas cada pedaço de informação adicional que é associado a um roteiro de fabrico cria um leque de possibilidades — **e cada uma dessas possibilidades torna o planeamento mais otimizado, que é sempre o fim para onde tudo aponta.**

O roteiro de fabrico pode ter associado o consumo teórico de material antes do início do fabrico, e o consumo de material real depois do fabrico. A saída de material do armazém menos o peso final da peça dá uma estimativa do peso desperdiçado por peça, mas o mais interessante seria conseguir discretizar por tipo de material. Por exemplo, um tapete é fabricado com 10 cores, o armazém tem que contabilizar as existências por cor, mas o peso final também tem se vamos contabilizar desperdício por cor. Entra aí a sensorização — é necessária uma balança e uma câmara. Inicialmente faz-se tudo isto no tablet do trabalhador, sem sensores, e vai ter que funcionar, mas convencem-se os donos a investir na sensorização porque eles têm que se preparar para a automação, senão vão ser substituídos por fábricas automáticas.

Trabalhar com consumo de material significa trabalhar com stock, e trabalhar com stock é das coisas mais complexas.

Se a fábrica produz para stock temos que definir stock mínimo, ponto de encomenda, etc. Isso pode-se fazer automáticamente também — é tempo desperdiçado se estiver um humano nesse loop — é um aumento do time to market (que a kaizen tambem nao considera), **e é mais uma entrada que o motor de planeamento consome.**

Para definir o stock minimo e ponto de encomenda, é necessário um software de simulação e otimização — o estado da arte são os Temporal Fusion Transformers. É isso que vamos incorporar. A fábrica volta a ser lean no aspeto que a kaizen não considera.

Faturação. A faturação é uma das principais chatices para as fábricas. É uma dor séria e automatizá-la é um nice-to have, mas não acho que seria valorizada o suficiente quanto uma solução standalone.

Controlo de qualidade na maioria dos casos é busy work — nunca se resolve o problema base. Para haver um bom cotrolo de qualidade, a nossa plataforma junta-a a todo o resto da informação que vai com o roteiro de fabrico, e com base no tipo de inconformidade, consegue prever a causa, dando um score de qualidade à máquina ou pessoa que fez essa operação — passa a ser um problema com solução. E mais uma vez, isto tem que ter associado o dinheiro que isto está a custar, senão as pessoas não vão olhar para um score de qualidade baixo com seriedade. A kaizen caga no controlo de qualidade por não ter solução. Nós fazemos a solução. **E o score de qualidade volta a alimentar o planeamento — uma máquina com score baixo é uma máquina cujo tempo de operação o planeamento tem que pesar de outra forma.**

Tempos intermédios — é uma das coisas mais fáceis de contabilizar. É quando o lote está em fabrico mas não está associado a nenhuma operação. **É também um dos dados mais valiosos para o planeamento, porque é desperdício puro de tempo que o gantt otimizado elimina.**

Quando o ciclo de produção fecha o produto passa para o armazém de expedição. O tempo que ele passa nesse armazém, ou em qualquer armazém intremédio, também tem um custo associado. É importante que o cliente saiba este custo.

Conhecendo os tempos intermédios e custos de stock intermédio, o dono consegue fazer o trabalho da kaizen — é simples, e pode ter sugestões de IA aqui para reorganização da linha de produção.

O grande problema dos dados é que devemos também considerar. Os dados inseridos por humanos são OK. Vêm com falhas, vêm atrasados, às vezes nem vêm, portanto precisamos de sensorizar as coisas — até porque daqui a uns anos vai ser o robô a operar e não vai fazer sentido haver um humano apenas para inserir valores num tablet. **Quanto melhores os dados, melhor o planeamento — é sempre essa a cadeia.**

Com dados bons podemos fazer também outras coisas. Abre um potencial enorme de coisas aliás, coisas que ainda não fazem sentido, que ainda não percebemos. Podemos pegar nos dados de vendas, fazer testes de personalidade as pessoas, e perceber o perfil de quem vende melhor. O mesmo para pessoal da produção. Podemos ver produtividade por pessoa e perceber se é vantajoso as pessoas trabalharem mais de manhã/tarde/noite. Tirar temperatura e humidade na fábrica toda também é uma necessidade que não é satisfeita.

O potencial é infinito. As fábricas estão mesmo atrasadas face àquilo que é a tecnologia de consumidor, para a maior parte dos casos é pegar na que já existe e aplicá-la. **Mas o potencial todo orbita o mesmo núcleo: o rastreamento das ordens de fabrico que vendemos, e o planeamento que ele alimenta e que é aquilo por que a fábrica paga.**

O produto deve ser plug-and-play. Nós não queremos fazer setup nenhum, o setup que for para ser feito tem que ser do lado da fábrica, eles é que o têm que fazer, da mesma forma que eu tenho que fazer o setup da minha conta google. A sensorização também faz sentido que sejam eles, e para isso o setup tem que ser extremamente simples. Tem que ser uma questão só de colocar lá o sensor e ligá-lo à rede, o IndustryOS tem depois que o encontrar.

Para setups iniciais faz sentido correr um agente de IA — ele tem que percorrer as bases de dados e perceber onde é que está a informação existente toda para a associar aos módulos corretos (no caso de integração ou merge de plataforma). Automatizar o merge também faz sentido.
