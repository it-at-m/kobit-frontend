/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2021
 */
package de.muenchen.kobit.controller;

import com.github.tomakehurst.wiremock.WireMockServer;
import de.muenchen.kobit.ApiGatewayApplication;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;


@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {ApiGatewayApplication.class}, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWireMock(port = 0)
public class PingControllerTest {

    /**
     * The port must correspond to the port of the backend route.
     */
    @Autowired
    public WireMockServer wiremock;

    @Autowired
    private WebTestClient webTestClient;

    @Test
    @WithMockUser
    void ping() {
        webTestClient.get().uri("/api").exchange().expectStatus().isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void pingNotAuthenticated() {
        webTestClient.get().uri("/api").exchange().expectStatus().isEqualTo(HttpStatus.FOUND);
    }

}

