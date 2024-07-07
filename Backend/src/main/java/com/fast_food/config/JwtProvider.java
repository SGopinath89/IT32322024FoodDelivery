package com.fast_food.config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

@Service
public class JwtProvider {

    private SecretKey key= Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String geneateToken(Authentication auth){

        Collection<? extends GrantedAuthority> authorities =auth.getAuthorities();
        String roles = populateAuthorities(authorities);  //jwt token allows only string type that's why convert to string again

        String jwt= Jwts.builder().setIssuedAt(new Date())
                .setExpiration((new Date(new Date().getTime()+8640000)))
                .claim("email",auth.getName())
                .claim("authorities",roles)
                .signWith(key)
                .compact();

        return  jwt;
    }

    public String getEmailFromJwtToken(String jwt){
        jwt=jwt.substring(7);

        Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        String email=String.valueOf(claims.get("email"));

        return email;
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {

        Set<String> auths=new HashSet<>();

        for (GrantedAuthority authority:authorities){
            auths.add(authority.getAuthority());
        }
        return  String.join(",",auths);

    }
}
