/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2021
 */
package de.muenchen.kobit.filter;

import de.muenchen.kobit.ApiGatewayApplication;
import org.apache.commons.codec.Charsets;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.junit.jupiter.api.Assertions.assertTrue;


@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {ApiGatewayApplication.class}, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWireMock(port = 0)
public class GlobalRequestParameterPollutionFilterTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    @WithMockUser
    public void parameterPollutionAttack() {
        final StringBuilder jsonResponseBody = new StringBuilder();
        webTestClient.get()
                .uri("/api/kobit-backend-service/testendpoint?parameter1=testdata_1&parameter2=testdata&parameter1=testdata_2")
                .exchange().expectStatus().isEqualTo(HttpStatus.BAD_REQUEST).expectBody().consumeWith(
                        responseBody -> jsonResponseBody.append(new String(responseBody.getResponseBody(), Charsets.UTF_8)));
        assertTrue(jsonResponseBody.toString().contains("\"message\" : \"parameter pollution\""));
    }

}

