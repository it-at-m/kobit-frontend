package de.muenchen.kobit.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Order(1) // Stellen Sie sicher, dass der Filter zuerst ausgeführt wird
public class LoggingWebFilter implements WebFilter {

    private static final Logger logger = LoggerFactory.getLogger(LoggingWebFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        // Protokollieren der Anfrageheader
        exchange.getRequest().getHeaders().forEach((key, value) -> {
            logger.info("Request Header: {} = {}", key, String.join(",", value));
        });

        // Weiterleiten der Anfrage zur nächsten Stufe im Filterketten
        return chain.filter(exchange);
    }
}
