package com.example.java_demo.service;

import com.example.java_demo.model.Repo;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.*;
import java.time.LocalDate;
import java.util.*;

@Service
public class GitHubService {


    public List<Repo> getTrending(String duration, int limit) {
        try {
            String date = switch (duration) {
                case "day" -> LocalDate.now().minusDays(1).toString();
                case "month" -> LocalDate.now().minusMonths(1).toString();
                case "year" -> LocalDate.now().minusYears(1).toString();
                default -> LocalDate.now().minusWeeks(1).toString(); // week
            };

            String url = "https://api.github.com/search/repositories?q=created:%3E" + date + "&sort=stars&order=desc";
            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Accept", "application/vnd.github+json")
                    .header("User-Agent", "SpringBoot-App")
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.body());

            JsonNode items = root.get("items");

            if (items == null || !items.isArray()) {
                throw new RuntimeException("GitHub API error: " + root.toString());
            }

            List<Repo> repos = new ArrayList<>();

            for (JsonNode item : items) {
                Repo repo = new Repo();
                repo.name = item.get("full_name").asText();
                repo.description = item.get("description").asText("");
                repo.stars = item.get("stargazers_count").asInt();
                repo.language = item.get("language").asText("N/A");
                repo.url = item.get("html_url").asText();

                repos.add(repo);
                if (repos.size() >= limit) break;
            }

            return repos;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching GitHub API: " + e.getMessage());
        }
    }
}